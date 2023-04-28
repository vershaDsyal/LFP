<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\Transactions;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class OrdersController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'customer_id'=>'required',
            'product_id'=>'required',
            'quantity'=>'required'
        ]);

        try{
            
            $params     =  $request->all();
            $customer = (isset($params['customer_id']) && $params['customer_id'] != '' && $params['customer_id'] != null) ? $params['customer_id'] : \Auth::user()->id;
            $product = Product::where('id',$params['product_id'])->first();

            $order                   = new Orders;
            $order->product_id       = $params['product_id'];
            $order->customer_id      = $customer;
            $order->status           = 'pending' ;
            $order->product_quantity = $params['quantity'] ;
            
            if($order->save()){
                $transaction               = new Transactions;
                $transaction->order_id     = $order->id;
                $transaction->customer_id  = $customer;
                $transaction->price        = $product->price * $params['quantity'];
                $transaction->status       = 'in-progress';
                if($transaction->save()){
                    return response()->json([
                        'message'=>'Orders Created Successfully!!'
                    ]);

                }

            }

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating  Orders!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function show(Orders $orders)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function edit(Orders $orders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Orders $orders)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Orders  $orders
     * @return \Illuminate\Http\Response
     */
    public function destroy(Orders $orders)
    {
        //
    }
}
